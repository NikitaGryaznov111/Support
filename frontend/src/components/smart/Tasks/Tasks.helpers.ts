interface IArrDataTask {
  taskId: string | undefined;
  taskName: string | null;
  description: string | null;
}

export default function getCheckedTask(
  listRef: React.RefObject<HTMLUListElement | null>
): IArrDataTask[] | undefined {
  if (!listRef) return;
  const ul = listRef.current;
  if (!ul) return;
  const inputs = ul.getElementsByTagName('input');
  const dataTask: Array<IArrDataTask> = [];

  for (const input of inputs) {
    const li = input.closest('li');
    if (!li) return;
    const taskId = li.dataset.taskid;
    const taskName = li.getElementsByTagName('span')[1].textContent;
    const description = li.getElementsByTagName('p')[0].textContent;
    if (input.checked && li) {
      dataTask.push({
        taskId,
        taskName,
        description,
      });
    }
  }
  return dataTask;
}
