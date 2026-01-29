import { getPortfolioData } from "@/lib/actions";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function PolicyPage({ params }: PageProps) {
    const { slug } = await params;
    const data = await getPortfolioData();
    // policies is an array of objects: [{ "lipi": "..." }, { "otherApp": "..." }]
    const policies = data.policies || [];

    // Find the policy object that contains the requested app name (key)
    // We iterate through the array, and for each object, check if it has a key matching the slug
    let content = null;
    let policyKey = null;

    for (const policyObj of policies) {
        const key = Object.keys(policyObj).find(k => k.toLowerCase() === slug.toLowerCase());
        if (key) {
            policyKey = key;
            content = policyObj[key];
            break;
        }
    }

    if (!content) {
        return notFound();
    }

    return (
        <div className="min-h-screen w-full max-w-4xl mx-auto p-8 pt-24 text-(--text-primary)">
            <Link
                href="/policies"
                className="inline-flex items-center gap-2 mb-8 text-xl font-hand hover:text-white/80 transition-colors"
            >
                <MoveLeft size={24} />
                Back to Policies
            </Link>

            <article className="chalk-border-straight p-8 md:p-12 bg-black/40 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="border-b border-white/20 pb-6 mb-8">
                    <h1 className="text-4xl md:text-5xl font-chalk mb-4 capitalize">{policyKey}</h1>
                </div>

                <div
                    className="privacy-content font-hand text-lg leading-relaxed space-y-6 opacity-90"
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            </article>
        </div>
    );
}
