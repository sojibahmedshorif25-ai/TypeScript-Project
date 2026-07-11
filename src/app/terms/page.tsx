import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100">Last updated: July 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing or using TypeMarket, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-6">
              TypeMarket is an online marketplace platform that allows users to list, discover, and transact products and services. We provide the platform but are not a party to any transaction between buyers and sellers.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-600 mb-6">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating an account.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Listing Guidelines</h2>
            <p className="text-gray-600 mb-6">
              Users may list items for sale or service offerings. All listings must be accurate, not misleading, and comply with applicable laws. We reserve the right to remove listings that violate our policies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Activities</h2>
            <p className="text-gray-600 mb-6">
              Users may not engage in fraudulent activity, spam, harassment, or any illegal conduct on our platform. We reserve the right to suspend or terminate accounts that violate these terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              The TypeMarket name, logo, and platform design are our intellectual property. Users retain ownership of their content but grant us a license to display it on our platform.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              TypeMarket is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the platform or transactions between users.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. Users will be notified of material changes. Continued use of the platform after changes constitutes acceptance of the new terms.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact Us &rarr;</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
