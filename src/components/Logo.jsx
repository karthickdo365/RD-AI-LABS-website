/** Brand mark + wordmark used in the navbar and footer. */
export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight ${className}`}>
      <img src="/favicon.svg" alt="" className="h-9 w-9" width="36" height="36" />
      <span className="text-xl text-white">
        RD <span className="text-gradient">AI</span> Labs
      </span>
    </span>
  )
}
