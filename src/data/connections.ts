import { expertise } from './expertise.ts';
import { featuredProject } from './profile.ts';

export const relationshipIds = ['knowledge', 'workflow', 'assistants', 'project'] as const;
export type RelationshipId = (typeof relationshipIds)[number];

export const relationshipItems: Record<RelationshipId, readonly string[]> = {
  knowledge: expertise.languages ?? [],
  workflow: expertise.tools ?? [],
  assistants: expertise.ai ?? [],
  project: featuredProject.technologies,
};
