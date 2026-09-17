export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto pt-32 pb-20 px-[5vw] text-[#9CA3AF] font-sans text-sm leading-relaxed">
      <h1 className="text-3xl font-mono text-white tracking-widest mb-8 uppercase">Privacy Policy</h1>
      
      <h2 className="text-xl font-mono text-white mt-8 mb-4">1. Data Processing</h2>
      <p className="mb-4">
        We automate the transfer of booking and transaction logs directly to authorized Google Sheets infrastructure. We do not sell or monetize this telemetry.
      </p>

      <h2 className="text-xl font-mono text-white mt-8 mb-4">2. Collection of Information</h2>
      <p className="mb-4">
        When using NexusDesk, operational metrics and customer interaction data are logged strictly for system performance evaluation and service delivery. 
        No superfluous personally identifiable information is collected beyond what is strictly necessary for cafe operations.
      </p>

      <h2 className="text-xl font-mono text-white mt-8 mb-4">3. Security Operations</h2>
      <p className="mb-4">
        All transmission of operational data is secured via standard encryption protocols. The underlying storage relies on Google Cloud infrastructure.
      </p>
    </div>
  );
}
