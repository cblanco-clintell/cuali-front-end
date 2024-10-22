import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { Keyword } from '@/types/keywords';
import { Category } from '@/types/categories';
import { Segment } from '@/types/segments';
import { StudioModel, StudioDocumentModel } from '@/types/studios';
import { GrammarData } from '@/types/grammar';

// Basic selectors
export const selectProjects = (state: RootState) => state.projects.projects || [];
export const selectSelectedProjectId = (state: RootState) => state.projects.selectedProjectId || null;
export const selectSelectedObjectiveIndex = (state: RootState) => state.projects.selectedObjectiveIndex || null;
export const selectSelectedQuestionIndex = (state: RootState) => state.projects.selectedQuestionIndex;
export const selectSelectedStudioIds = (state: RootState) => state.projects.selectedStudioIds;

// Memoized selector to get the selected project
export const selectSelectedProject = createSelector(
  [selectProjects, selectSelectedProjectId],
  (projects, selectedProjectId) => {
    return projects.find(project => project.id === selectedProjectId) || null;
  }
);

export const selectSelectedQuestion = createSelector(
  [selectSelectedProject, selectSelectedQuestionIndex],
  (selectedProject, selectedQuestionIndex) => {
    return selectedProject?.questions?.[selectedQuestionIndex] || null;
  }
)

// Memoized selector to get the selected objective of the selected project
export const selectSelectedObjective = createSelector(
  [selectSelectedProject, selectSelectedObjectiveIndex],
  (selectedProject, selectedObjectiveIndex) => {
    if (selectedProject && selectedObjectiveIndex !== null && selectedProject.objectives) {
      return selectedProject.objectives[selectedObjectiveIndex] || null;
    }
    return null;
  }
);

export const getProjectCategories = createSelector(
  [selectSelectedProject],
  (selectedProject) => {
    return selectedProject?.studios?.map(
      (studio) => {
        return studio.studio_documents?.map(
          (studio_document) => {
            return studio_document.categories;
          }
        )
      }
    )
  }
);

export const getStudios = createSelector(
  [selectSelectedProject],
  (selectedProject) => {
    return selectedProject?.studios;
  }
)

export const getQuestions = createSelector(
  [selectSelectedProject],
  (selectedProject) => {
    let questions = [];
    selectedProject?.studios?.map(
      (studio) => {
        studio.studio_documents?.map(
          (studio_document) => {
            questions.push(studio_document.questions);
          }
        )
      }
    )
  }
)

export const selectSelectedKeywords = createSelector(
  [selectSelectedProject, selectSelectedQuestion, selectSelectedStudioIds],
  (selectedProject, selectedQuestion, selectedStudioIds) => {
    if (!selectedProject || !selectedQuestion) return [];
    
    let filteredKeywords = selectedProject.keywords || [];

    // Filter by selected question
    const questionIds = selectedQuestion.questions_ids;
    filteredKeywords = filteredKeywords.filter((keyword: Keyword) =>
      keyword.question_ids.some((id: number) => questionIds.includes(id))
    );

    // Filter by selected studios
    if (selectedStudioIds && selectedStudioIds.length > 0) {
      console.log("selectedStudioIds", selectedStudioIds);
      filteredKeywords = filteredKeywords.filter((keyword: Keyword) => {
        // Get all studio IDs from the keyword
        console.log("keyword", keyword);
        const keywordStudioIds = keyword.studio_ids;
        console.log("keywordStudioIds", keywordStudioIds);
        
        // Check if any of the keyword's studio IDs are in the selected studios
        return keywordStudioIds.some(id => selectedStudioIds.includes(id));
      });
    }

    // Sort keywords by valence and sentiment
    const valenceOrder = ['positive', 'neutral', 'negative'];
    filteredKeywords.sort((a: Keyword, b: Keyword) => {
      const valenceComparison = valenceOrder.indexOf(a.valence) - valenceOrder.indexOf(b.valence);
      if (valenceComparison !== 0) return valenceComparison;
      return b.sentiment - a.sentiment;
    });
    console.log(filteredKeywords);
    return filteredKeywords;
  }
);

export const selectCurrentCategories = createSelector(
  // Gets the categories of the selected project for the selected question
  [selectSelectedProject, selectSelectedQuestion],
  (selectedProject, selectedQuestion) => {
    if (!selectedProject || !selectedQuestion) return [];

    const questionIds = selectedQuestion.questions_ids;
    const filteredCategories = selectedProject.categories?.filter((category: Category) => 
      category.question_ids.some((id: number) => questionIds.includes(id))
    ) || [];

    return filteredCategories;
  }
)

export const selectCategoryKeywords = createSelector(
  [selectSelectedKeywords, (state, category: Category) => category],
  (selectedKeywords, category) => {
    return selectedKeywords.filter((keyword: Keyword) => 
      keyword.categories_ids.some((id: number) => category.category_ids.includes(id))
    );
  }
); 


export const selectGeneralEmotions = createSelector(
  [selectSelectedKeywords],
  (selectedKeywords: Keyword[]): Array<{
    name: string;
    positive: number;
    positivePercentage: number;
    neutral: number;
    neutralPercentage: number;
    negative: number;
    negativePercentage: number;
  }> => {
    const counts = selectedKeywords.reduce((acc: { positive: number; neutral: number; negative: number }, keyword: Keyword) => {
      acc[keyword.valence as 'positive' | 'neutral' | 'negative'] += keyword.sentiment;
      return acc;
    }, { positive: 0, neutral: 0, negative: 0 });

    const total: number = Object.values(counts).reduce((acc, val) => acc + val, 0);

    return [
      {
        name: 'General Emotions',
        positive: counts.positive,
        positivePercentage: (counts.positive / total) * 100,
        neutral: counts.neutral,
        neutralPercentage: (counts.neutral / total) * 100,
        negative: counts.negative,
        negativePercentage: (counts.negative / total) * 100
      }
    ];
  }
);

interface KeywordWithSegments extends Keyword {
  segments: Segment[];
}

export const selectKeywordSegments = createSelector(
  [selectSelectedProject, (_: RootState, keywords: Keyword[]) => keywords],
  (selectedProject, keywords): KeywordWithSegments[] => {
    if (!selectedProject || !keywords || keywords.length === 0) return [];

    const projectSegments = selectedProject.segments;

    return keywords.map(keyword => {
      const keywordSegments = projectSegments.filter(segment => 
        keyword.segments_ids.includes(segment.id)
      );

      return {
        ...keyword,
        segments: keywordSegments
      };
    });
  }
);

export const getStudioDocumentByID = createSelector(
  [selectSelectedProject, (_: RootState, studioDocumentID: number) => studioDocumentID],
  (selectedProject, studioDocumentID) => {
    if (!selectedProject) return null;
    for (const studio of selectedProject.studios) {
      const document = studio.studio_documents.find(doc => doc.id === studioDocumentID);
      if (document) return document;
    }
    return null;
  }
);

export const getStudioByDocumentID = createSelector(
  [selectSelectedProject, (_: RootState, studioDocumentID: number) => studioDocumentID],
  (selectedProject, studioDocumentID): StudioModel | null => {
    if (!selectedProject) return null;
    for (const studio of selectedProject.studios) {
      if (studio.studio_documents.some(doc => doc.id === studioDocumentID)) {
        return studio;
      }
    }
    return null;
  }
);

export const getStudioDocumentSegments = createSelector(
  [selectSelectedProject, (_: RootState, studioDocumentID: number) => studioDocumentID],
  (selectedProject, studioDocumentID) => {
    if (!selectedProject) return [];
    return selectedProject.segments
      .filter(segment => segment.studio_document === studioDocumentID)
      .sort((a, b) => a.start - b.start); // Sort segments by start time
  }
);

interface OrganizedSegments {
  [studioId: number]: {
    studio: StudioModel;
    documents: {
      [documentId: number]: {
        document: StudioDocumentModel;
        speakers: {
          [speaker: string]: Segment[];
        };
      };
    };
  };
}

export const selectOrganizedSegments = createSelector(
  [selectSelectedProject],
  (selectedProject): OrganizedSegments => {
    if (!selectedProject) return {};

    const organizedSegments: OrganizedSegments = {};

    selectedProject.studios.forEach(studio => {
      organizedSegments[studio.id] = {
        studio: studio,
        documents: {}
      };

      studio.studio_documents.forEach(document => {
        organizedSegments[studio.id].documents[document.id] = {
          document: document,
          speakers: {}
        };
      });
    });

    selectedProject.segments.forEach(segment => {
      if (segment.studio_document) {
        const studio = selectedProject.studios.find(s => 
          s.studio_documents.some(d => d.id === segment.studio_document)
        );

        if (studio) {
          const studioId = studio.id;
          const documentId = segment.studio_document;
          const speaker = segment.speaker;

          if (!organizedSegments[studioId].documents[documentId].speakers[speaker]) {
            organizedSegments[studioId].documents[documentId].speakers[speaker] = [];
          }

          organizedSegments[studioId].documents[documentId].speakers[speaker].push(segment);
        }
      }
    });

    // Sort segments within each speaker group
    // Object.values(organizedSegments).forEach(studio => {
    //   Object.values(studio.documents).forEach(document => {
    //     Object.values(document.speakers).forEach(segments => {
    //       segments.sort((a: Segment, b: Segment) => a.start - b.start);
    //     });
    //   });
    // });

    return organizedSegments;
  }
);

export const selectProjectGrammar = createSelector(
  [selectSelectedProject, (_: RootState, studioId?: number) => studioId],
  (selectedProject, studioId): GrammarData[] | undefined => {
    if (!selectedProject?.grammar) return undefined;

    if (studioId !== undefined) {
      return selectedProject.grammar.filter(g => {
        const studio = selectedProject.studios.find(s => 
          s.studio_documents.some(d => d.id === g.studio_document)
        );
        return studio?.id === studioId;
      });
    }

    return selectedProject.grammar;
  }
);

// Add this new selector at the end of the file
export const selectKeywordCategories = createSelector(
  [
    selectSelectedProject,
    selectSelectedKeywords,
  ],
  (selectedProject, selectedKeywords) => {
    if (!selectedProject || !selectedKeywords) return [];

    // Get all unique category IDs from the selected keywords
    const uniqueCategoryIds = Array.from(new Set(
      selectedKeywords.flatMap((keyword: Keyword) => keyword.categories_ids)
    ));

    // Filter the project categories to only include those present in the keywords
    return selectedProject.categories?.filter((category: Category) => 
      category.category_ids.some(id => uniqueCategoryIds.includes(id))
    ) || [];
  }
);
