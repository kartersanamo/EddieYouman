export function InvoiceHtmlFrame({
  html,
  invoiceNumber,
}: {
  html: string;
  invoiceNumber?: string | null;
}) {
  return (
    <iframe
      srcDoc={html}
      title={`Invoice ${invoiceNumber ?? ""}`}
      className="mt-4 w-full min-h-[28rem] rounded-lg border border-slate/10 bg-white"
      sandbox=""
    />
  );
}
