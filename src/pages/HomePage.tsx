import { PageGuard } from 'hoc/PageGuard';

export const HomePage = () => {
  return (
    <PageGuard>
      <div>Home Page</div>
    </PageGuard>
  );
};
