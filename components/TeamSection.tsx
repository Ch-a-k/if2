import {client, queries, type TeamMember, type Specialist} from '@/lib/sanity'
import styles from './TeamSection.module.css'

export const revalidate = 3600 // Обновление каждый час (или по webhook)

export default async function TeamSection() {
  let teamMembers: TeamMember[] = []
  let specialists: Specialist[] = []

  try {
    const results = await Promise.all([
      client.fetch<TeamMember[]>(queries.teamMembers),
      client.fetch<Specialist[]>(queries.specialists),
    ])
    teamMembers = results[0] || []
    specialists = results[1] || []
  } catch (error) {
    console.error('Error fetching team data:', error)
  }

  return (
    <section className={styles.teamSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>03</div>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Meet Our Team</h2>
            <p className={styles.subtitle}>
              Talented individuals united by passion for innovation and excellence
            </p>
          </div>
        </div>

        {teamMembers.length > 0 && (
          <div className={styles.teamGrid}>
            {teamMembers.map((member) => (
            <div 
              key={member._id} 
              className={`${styles.memberCard} ${styles[member.category]}`}
            >
              <div className={styles.memberInitial}>
                {member.name.charAt(0)}
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberRole}>{member.role}</p>
              </div>
            </div>
            ))}
          </div>
        )}

        {/* Dedicated Team Section */}
        {specialists.length > 0 && (
          <div className={styles.dedicatedSection}>
            <div className={styles.dedicatedHeader}>
              <h3 className={styles.dedicatedTitle}>Dedicated Specialists</h3>
              <p className={styles.dedicatedSubtitle}>
                Expert team members available for your projects on-demand
              </p>
            </div>

            <div className={styles.specialistsGrid}>
              {specialists.map((specialist) => (
              <div key={specialist._id} className={styles.specialistCard}>
                <div className={styles.specialistIcon}>
                  {specialist.iconType === 'emoji' ? (
                    specialist.icon
                  ) : specialist.svgCode ? (
                    <div 
                      className={styles.svgWrapper}
                      dangerouslySetInnerHTML={{__html: specialist.svgCode}}
                    />
                  ) : (
                    '💼'
                  )}
                </div>
                <div className={styles.specialistInfo}>
                  <div className={styles.specialistCount}>{specialist.count}</div>
                  <div className={styles.specialistTitle}>{specialist.title}</div>
                </div>
              </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
