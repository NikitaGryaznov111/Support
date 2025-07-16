interface IArrDataProject {
  projectId: string;
}
export default function getCheckedProjects(
  listRef: React.RefObject<HTMLUListElement | null>
): IArrDataProject[] | undefined {
  const dataProject: Array<IArrDataProject> = [];
  const ul = listRef.current;
  if (!ul) return;
  const inputs = ul.getElementsByTagName('input');
  for (const input of inputs) {
    if (input.checked) {
      const li = input.closest('li');
      if (!li) return;
      const projectId = li.dataset.projectid;
      if (projectId) {
        dataProject.push({ projectId });
      }
    }
  }
  return dataProject;
}
