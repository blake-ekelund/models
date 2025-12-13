export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-[#1B3C53] mb-4">
          Terms of Service
        </h1>

        <p className="text-sm text-[#456882] mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-6 text-sm text-[#456882] leading-relaxed">
          <p>
            These Terms of Service (“Terms”) govern your access to and use of
            Synario’s website, applications, and services (“Services”). By
            accessing or using the Services, you agree to be bound by these
            Terms.
          </p>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Use of the Services
            </h2>
            <p>
              You may use the Services only in compliance with these Terms and
              all applicable laws and regulations. You are responsible for
              maintaining the confidentiality of your account credentials and
              for all activities that occur under your account.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Accounts and Authentication
            </h2>
            <p>
              Synario uses third-party services such as Supabase and Google OAuth
              to authenticate users and manage access. You agree to provide
              accurate information when creating an account and to keep your
              account information up to date.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Acceptable Use
            </h2>
            <p>
              You agree not to misuse the Services, interfere with their normal
              operation, attempt unauthorized access, or use the Services for
              unlawful, harmful, or abusive purposes.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Intellectual Property
            </h2>
            <p>
              All content, features, and functionality of the Services are owned
              by Synario or its licensors and are protected by intellectual
              property laws. You may not copy, modify, distribute, or reverse
              engineer any part of the Services without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Availability and Changes
            </h2>
            <p>
              We may modify, suspend, or discontinue any part of the Services at
              any time without notice. We do not guarantee that the Services
              will be uninterrupted or error-free.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Disclaimer
            </h2>
            <p>
              The Services are provided “as is” and “as available” without
              warranties of any kind, express or implied. Synario disclaims all
              warranties, including implied warranties of merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Synario shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of or related to your use of the
              Services.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Termination
            </h2>
            <p>
              We may suspend or terminate your access to the Services at any
              time if you violate these Terms or misuse the Services.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of the United States, without regard to conflict of law
              principles.
            </p>
          </div>

          <div>
            <h2 className="font-medium text-[#1B3C53] mb-2">
              Contact
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
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
