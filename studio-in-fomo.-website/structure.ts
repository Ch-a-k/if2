import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('IN-FOMO. Content')
    .items([
      // Portfolio Section
      S.listItem()
        .title('📁 Portfolio')
        .child(
          S.list()
            .title('Portfolio')
            .items([
              S.listItem()
                .title('Projects')
                .icon(() => '🎨')
                .child(S.documentTypeList('project').title('All Projects')),
              S.listItem()
                .title('Featured Projects')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "project" && featured == true')
                ),
            ])
        ),

      // Blog Section
      S.listItem()
        .title('📝 Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Blog Posts')
                .icon(() => '📄')
                .child(S.documentTypeList('blogPost').title('All Posts')),
              S.listItem()
                .title('Authors')
                .icon(() => '👤')
                .child(S.documentTypeList('author').title('All Authors')),
              S.listItem()
                .title('Featured Posts')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('Featured Posts')
                    .filter('_type == "blogPost" && featured == true')
                ),
            ])
        ),

      S.divider(),

      // Team Section
      S.listItem()
        .title('👥 Team & Partners')
        .child(
          S.list()
            .title('Team & Partners')
            .items([
              S.listItem()
                .title('Team Members')
                .icon(() => '👔')
                .child(S.documentTypeList('teamMember').title('C-Level Team')),
              S.listItem()
                .title('Specialists')
                .icon(() => '💼')
                .child(S.documentTypeList('specialist').title('Dedicated Specialists')),
              S.listItem()
                .title('Partners')
                .icon(() => '🤝')
                .child(S.documentTypeList('partner').title('All Partners')),
            ])
        ),

      // Social Proof
      S.listItem()
        .title('⭐ Social Proof')
        .child(
          S.list()
            .title('Social Proof')
            .items([
              S.listItem()
                .title('Testimonials')
                .icon(() => '💬')
                .child(S.documentTypeList('testimonialNew').title('All Testimonials')),
              S.listItem()
                .title('Clutch Badges')
                .icon(() => '🏆')
                .child(S.documentTypeList('clutchBadge').title('All Badges')),
            ])
        ),

      S.divider(),

      // Settings
      S.listItem()
        .title('⚙️ Settings')
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Categories')
                .icon(() => '🏷️')
                .child(S.documentTypeList('category').title('All Categories')),
            ])
        ),
    ])

export default structure
