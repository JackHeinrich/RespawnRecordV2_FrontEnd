import TopBar from "@/app/components/TopBar/TopBar";

export default async function SearchResultsPage({
  params,
}: {
  params: { searchTerm: string };
}) {
  const searchTerm = params.searchTerm;
  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="m-8">Results for {searchTerm}</div>
    </div>
  );
}
