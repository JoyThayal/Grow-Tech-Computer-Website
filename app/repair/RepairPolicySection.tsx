import { Wrench } from "lucide-react";

export default function RepairPolicySection() {
  return (
    <div className="rounded-3xl bg-[#e6ecf2] p-6 md:p-10 shadow-[8px_8px_16px_#c5ccd4,-8px_-8px_16px_#ffffff] space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#e6ecf2] flex items-center justify-center text-[#cb784a] shadow-[4px_4px_8px_#c5ccd4,-4px_-4px_8px_#ffffff]">
          <Wrench className="w-5 h-5" />
        </div>
        <h3 className="text-lg md:text-xl font-black text-slate-800 uppercase tracking-tight">
          Service & Diagnosis Policy
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-xs text-slate-600 leading-relaxed">
        <div className="space-y-3 md:space-y-4 p-4 md:p-5 rounded-2xl shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff]">
          <p>
            <strong>1. Testing / Diagnosis Charge (₹100):</strong> If a customer
            brings a computer, laptop or printer solely for fault
            identification, the testing fee is ₹100.
          </p>
          <p>
            <strong>2. Repair Adjustment:</strong> If you proceed with the
            repair/service, the testing charge is adjusted against the final
            service bill.
          </p>
          <p>
            <strong>3. Unfixable Issues:</strong> If the problem cannot be
            solved after reasonable diagnosis, no repair fee is charged beyond
            standard testing.
          </p>
          <p>
            <strong>4. Rejection of Repair:</strong> If the fault is identified
            but you choose not to proceed with the repair, only the standard
            diagnosis charge applies.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4 p-4 md:p-5 rounded-2xl shadow-[inset_3px_3px_6px_#c8d0d8,inset_-3px_-3px_6px_#ffffff]">
          <p>
            <strong>5. Spare Parts:</strong> Components, ink, cartridges, and
            cables are billed separately as per actual market rates.
          </p>
          <p>
            <strong>6. Data Responsibility:</strong> Customers must back up
            essential data before OS installation or hardware repair. Grow Tech
            is not liable for unexpected data loss.
          </p>
          <p>
            <strong>7. Customer Approval:</strong> Paid repairs begin strictly
            after customer confirmation and approval.
          </p>
        </div>
      </div>
    </div>
  );
}
