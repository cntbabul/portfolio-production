import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { getPortfolioData } from "@/lib/actions";

export default async function Home() {
  const data = await getPortfolioData();
  const { personalInfo, techStack, projects, education, experience } = data;

  return (
    <div
      className="flex flex-col gap-12 w-full max-w-7xl mx-auto overflow-hidden"
      style={{
        // @ts-ignore
        "--text-primary": personalInfo.theme?.primaryColor || '#ffffff',
        "--text-secondary": personalInfo.theme?.secondaryColor || '#a0a0a0',
        "--border-accent": personalInfo.theme?.accentColor || '#ffffff',
        color: 'var(--text-primary)'
      }}
    >
      {/* Background override check */}
      {personalInfo.backgroundUrl && !['/blackboard-bg.png', '/blackboard-bg.jpg'].includes(personalInfo.backgroundUrl) && (
        <div
          className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed pointer-events-none"
          style={{ backgroundImage: `url('${personalInfo.backgroundUrl}')` }}
        />
      )}

      <div id="hero">
        <Hero personalInfo={personalInfo} techStack={techStack} />
      </div>
      <div id="projects">
        <Projects projects={projects} />
      </div>
      <div id="experience">
        <Experience experience={experience} />
      </div>
      <div id="education">
        <Education education={education} />
      </div>

      <footer className="w-full text-center py-8 font-hand text-white/40">
        <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        <p className="text-sm">Designed with chalk & code.</p>
      </footer>
    </div>
  );
}
