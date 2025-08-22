export default function PageSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto max-w-4xl px-4 py-10">{children}</div>;
}
