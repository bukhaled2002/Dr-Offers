export function AuthPageLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {children}
        {footer && <div className="mt-4 text-center text-sm">{footer}</div>}
      </div>
      <div className="hidden md:block ml-20">
        <img src="/logo.png" alt="Dr.Offers Logo" className="w-72" />
      </div>
    </div>
  );
}
