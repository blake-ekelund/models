export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#1B3C53] mb-4">
          Privacy Policy
        </h1>

        <p className="text-sm text-[#456882] mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6 text-sm text-[#456882] leading-relaxed">
          <p>
            Synario (“we”, “our”, or “us”) respects your privacy and is committed
            to protecting your personal information. This Privacy Policy
            explains how we collect, use, and safeguard your information when
            you use our website and services.
          </p>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Information We Collect
            </h2>
            <p>
              We collect information you voluntarily provide when you create an
              account, sign in, or use our services. This may include your name,
              email address, authentication details, and usage data related to
              your activity within the product.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              How We Use Your Information
            </h2>
            <p>
              We use your information solely to provide, maintain, and improve
              our services. This includes authenticating users, enabling account
              access, improving product functionality, and communicating with
              you about service-related matters.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Authentication and Third-Party Services
            </h2>
            <p>
              Synario uses trusted third-party services such as Google OAuth and
              Supabase to securely authenticate users and manage sessions. We do
              not receive or store your Google password. Authentication data is
              handled in accordance with industry-standard security practices.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Data Security
            </h2>
            <p>
              We take reasonable measures to protect your information from
              unauthorized access, loss, misuse, or disclosure. However, no
              system can be guaranteed to be completely secure.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Data Retention
            </h2>
            <p>
              We retain personal information only for as long as necessary to
              provide our services or comply with legal obligations. You may
              request deletion of your account and associated data at any time.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal information by contacting us. We will respond to all
              reasonable requests in a timely manner.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Contact
            </h2>
            <p>
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at{" "}
              <a
                href="mailto:blake@synario.io"
                className="text-[#234C6A] hover:underline"
              >
                blake@synario.io
              </a>.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
