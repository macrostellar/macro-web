import { FileText } from 'lucide-react';


export default function ReportsPage() {
  return (
    <div>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-slate-400">Generate and view tracking reports</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
          <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Reports Coming Soon</h3>
          <p className="text-slate-400 max-w-md mx-auto">
            Advanced reporting features including trip summaries, fuel consumption analysis, and
            custom reports will be available in a future update.
          </p>
        </div>
      </div>
    </div>
  );
}
