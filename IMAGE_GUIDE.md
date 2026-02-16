# Helvino Technologies - Image Guide

## Image Directories Structure
```
public/
  images/
    ✅ logo.png (DONE)
    📄 favicon.ico (DONE)
    📄 hero-bg.jpg (ADD THIS - 1920x1080)
    📄 og-image.jpg (ADD THIS - 1200x630)
    
    services/
      📄 software-development.jpg (800x600)
      📄 networking.jpg (800x600)
      📄 cctv-surveillance.jpg (800x600)
      📄 cybersecurity.jpg (800x600)
      📄 it-support.jpg (800x600)
    
    projects/
      📄 (add as you create projects)
    
    blog/
      📄 (add as you create blog posts)
    
    team/
      📄 team-photo.jpg (1200x800)
    
    about/
      📄 office.jpg (1200x800)
```

## Free Image Resources

### Stock Photos
- **Unsplash**: https://unsplash.com/s/photos/technology
- **Pexels**: https://www.pexels.com/search/technology/
- **Pixabay**: https://pixabay.com/images/search/technology/

### Icon Resources
- **Flaticon**: https://www.flaticon.com
- **Icons8**: https://icons8.com

## Quick Setup Commands
```bash
# Create all directories
mkdir -p public/images/{services,projects,blog,team,about}

# After downloading images, add them
git add public/images/
git commit -m "Add website images"
git push origin master
vercel --prod
```

## How to Add Images in Admin

### Adding a Project
1. Upload image to: `public/images/projects/my-project.jpg`
2. In admin form, Image URL: `/images/projects/my-project.jpg`

### Adding a Blog Post
1. Upload cover image to: `public/images/blog/my-post.jpg`
2. In admin form, Cover Image URL: `/images/blog/my-post.jpg`

### Adding Service Images
Update via admin or database directly with path like:
`/images/services/software-development.jpg`

## Recommended Image Sizes

- **Logo**: 512x512px (transparent PNG)
- **Favicon**: 32x32px or 64x64px
- **Hero Images**: 1920x1080px
- **Service Images**: 800x600px
- **Project Images**: 1200x800px
- **Blog Covers**: 1200x630px (for social sharing)
- **OG Image**: 1200x630px
- **Team Photos**: 400x400px (square)
