import { PageGuard } from 'hoc/PageGuard';

export const BoardPage = () => {
  return (
    <PageGuard>
      <div>Board Page</div>
    </PageGuard>
  );
};
