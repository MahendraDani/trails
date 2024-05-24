interface IDashboardPageProps {
  params: {
    username: string;
  };
}
export default function Dashboard({ params }: IDashboardPageProps) {
  return <div>This is your dashboard {params.username}</div>;
}
