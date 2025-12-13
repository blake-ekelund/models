export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-[#E3E3E3] shadow-lg p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#1B3C53]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[#456882]">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
