import { getPortfolioData } from "@/lib/actions";
import { MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

export default async function PrivacyPage() {
    const data = await getPortfolioData();
    const policies = data.policies || [];
    // Extract policy names from the array of objects
    // Each object in the array has keys which are app names
    const policyNames = policies.flatMap((policyObj: any) => Object.keys(policyObj));

    return (
        <div className="min-h-screen w-full max-w-4xl mx-auto p-8 pt-24 text-(--text-primary)">
            <Link
                href="/"
                className="inline-flex items-center gap-2 mb-8 text-xl font-hand hover:text-white/80 transition-colors"
            >
                <MoveLeft size={24} />
                Back to Portfolio
            </Link>

            <header className="mb-12 text-center">
                <h1 className="text-5xl md:text-6xl font-chalk mb-4">Privacy Policies</h1>
                <p className="text-xl font-hand opacity-80">
                    Transparent protocols for our applications.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                {policyNames.length > 0 ? (
                    policyNames.map((appName: string, idx: number) => (
                        <Link
                            key={idx}
                            href={`/policies/${appName.toLowerCase()}`}
                            className="group"
                        >
                            <article className="chalk-border-straight p-8 bg-black/40 backdrop-blur-sm h-full hover:bg-black/60 transition-all duration-300 hover:-translate-y-1">
                                <h2 className="text-3xl font-chalk mb-3 group-hover:text-blue-300 transition-colors capitalize">
                                    {appName}
                                </h2>
                                <p className="text-base font-hand opacity-60 mb-4">
                                    Click to view full policy
                                </p>
                                <div className="flex items-center gap-2 text-sm font-hand opacity-80 group-hover:underline decoration-white/30 underline-offset-4">
                                    Read Policy <MoveRight size={16} />
                                </div>
                            </article>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 chalk-border-straight bg-black/20">
                        <p className="text-2xl font-hand opacity-60">No privacy policies available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
