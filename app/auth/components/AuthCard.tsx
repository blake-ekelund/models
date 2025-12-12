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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f8ff] to-[#ffffff] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-100 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-[#00338d]">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[#55565a]">
            {subtitle}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
