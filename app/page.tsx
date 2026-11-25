import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Postcard } from "@/components/Postcard";
import { Row } from "@/components/Row";
import { SeasonList } from "@/components/SeasonList";
import { WorkList } from "@/components/WorkList";
import { WritingList } from "@/components/WritingList";
import { about, mediumCard, serviceEntries, servicesCard, site, skills } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <main>
        <section id="work">
          <h2>Work</h2>
          <div className="split">
            <div className="col">
              <WorkList />
            </div>
            <aside className="card">
              <div className="av">{site.initials}</div>
              <h3>{site.name}</h3>
              <p>
                {site.role}
                <br />
                {site.location} · {site.status}
              </p>
              <div className="btns">
                <a className="btn pri" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
                <a className="btn" href={site.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
                <a className="btn" href={`mailto:${site.email}`}>
                  Email me
                </a>
              </div>
              <div className="chips">
                {skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="services">
          <h2>Services</h2>
          <div className="split">
            <div className="col">
              {serviceEntries.map((s) => (
                <Row key={s.title} {...s} />
              ))}
            </div>
            <aside className="card">
              <h3>{servicesCard.heading}</h3>
              <p>{servicesCard.blurb}</p>
              <a className="btn pri" href={`mailto:${site.email}`} style={{ display: "block" }}>
                {servicesCard.cta}
              </a>
            </aside>
          </div>
        </section>

        <section id="writing">
          <h2>Writing</h2>
          <div className="split">
            <div className="col">
              <WritingList />
            </div>
            <aside className="card">
              <h3>{mediumCard.heading}</h3>
              <p>{mediumCard.blurb}</p>
              <a
                className="btn pri"
                href={site.links.medium}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginBottom: 18 }}
              >
                {mediumCard.cta}
              </a>
              <SeasonList />
              <blockquote>{mediumCard.quote}</blockquote>
            </aside>
          </div>
        </section>

        <section id="about">
          <h2>About</h2>
          <div className="split">
            <div className="col">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <aside className="card">
              <h3>Currently</h3>
              <dl>
                {about.currently.map((c) => (
                  <div key={c.label}>
                    <dt>{c.label}</dt>
                    <dd>{c.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section id="connect">
          <h2>Connect</h2>
          <Postcard />
        </section>
      </main>

      <Footer />
    </>
  );
}
