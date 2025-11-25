# Design Guidelines for The Kabadi - Scrap Collection Service

## Design Approach
**Reference-Based Approach**: Drawing inspiration from eco-conscious service platforms like Airbnb (trust-building), Uber (service request flow), and modern environmental startups for clean, accessible design that emphasizes sustainability and convenience.

## Core Design Principles

### Typography System
- **Primary Font**: Inter or Poppins for clean, modern readability
- **Headings**: Bold weights (600-700) for strong hierarchy
  - H1: text-5xl to text-6xl (Hero headlines)
  - H2: text-4xl (Section headers)
  - H3: text-2xl to text-3xl (Subsections)
  - H4: text-xl (Card titles)
- **Body Text**: Regular weight (400) at text-base to text-lg
- **Accent Text**: Medium weight (500) for CTAs and highlights

### Layout System
**Tailwind Spacing Units**: Primary units are 4, 8, 12, 16, 20, 24, 32
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Card spacing: p-6 to p-8 for content
- Grid gaps: gap-6 to gap-8
- Container: max-w-7xl for full sections, max-w-6xl for content areas

## Component Library

### Cards (Creative & Consistent)
**Primary Card Style**: Rounded cards with subtle elevation
- Border radius: rounded-2xl to rounded-3xl
- Shadow: shadow-lg with hover:shadow-2xl transition
- Padding: p-6 to p-8
- Background: White with subtle border or gradient accent

**Card Variations** (use consistently throughout):
- **Service Cards**: Hexagonal or tilted containers with green accent borders, icons top-left, title, description, and "Learn More" link
- **Pricing Cards**: Elevated white cards with large scrap type icon, rate prominently displayed (₹ XX/kg), and hover scale effect
- **Review Cards**: Rounded-2xl with customer photo (circular), star ratings, quote text, and name/location
- **Initiative Cards**: Full-bleed image background with gradient overlay, white text, and green CTA button

### Navigation Header
- Sticky header with backdrop-blur effect on scroll
- Logo left-aligned (incorporate green leaf/recycle symbol)
- Horizontal navigation center (desktop) / hamburger menu (mobile)
- Dual CTAs right-aligned: "Request Pickup" (primary green button) and "Track Request" (outline button)
- Padding: px-8 py-4

### Hero Section
**Layout**: Two-column split (60/40 ratio on desktop, stacked on mobile)
- **Left Column**: 
  - Headline emphasizing convenience and eco-impact
  - Subheading with key benefit (doorstep pickup, fair rates)
  - Primary CTA: "Schedule Free Pickup" (vibrant green button, large)
  - Secondary CTA: "View Pricing" (outline button)
  - Trust indicators below CTAs (e.g., "10,000+ Happy Customers" with icons)
  
- **Right Column**: 
  - Hero image showing friendly collection agent with eco-friendly truck/sorting recyclables
  - Image treatment: rounded-3xl with subtle shadow

### Infinite Company Carousel
- Grayscale logos on white cards (rounded-xl, p-6)
- Auto-scroll with smooth CSS animation
- Duplicate logo set for seamless loop
- Section header: "Trusted by Leading Organizations"
- Spacing: py-16 section with gap-8 between logos

### Eco-Friendly Impact Section
- Full-width background with subtle green gradient overlay
- Large heading: "Making Society Eco-Friendly"
- Descriptive paragraph about environmental mission
- Grid of impact icons (trees planted, CO2 reduced, waste recycled) with animated counters
- Layout: 4-column grid (2-column mobile) with centered icons and stats

### Trust Metrics Counter
- 4 animated counter cards in grid layout
- Each card: Large number (text-5xl, green), label below, relevant icon
- Metrics: Customers Served, Kg Collected, Trees Saved, Pickup Locations
- Background: Light green tint (green-50)

### Services Overview Section
- Section title: "Our Services"
- Grid: 2x2 on desktop, stacked on mobile
- Each service (Vehicle Scrapping, Zero Waste Society, Paper Shredding, Dismantling):
  - Large icon/illustration
  - Service name (text-2xl)
  - Brief description (2-3 sentences)
  - "Explore Service" link with arrow
- Card style: Hexagonal borders with green accent left edge

### Initiatives Section
- 3-column grid (1-column mobile)
- Each initiative card with full-bleed background image, dark overlay
- White text with green underline on hover
- CTA at bottom: "Learn More"

### Scrap Pricing Display
- Grid of pricing cards (4-column desktop, 2-column tablet, 1-column mobile)
- Each card: 
  - Large scrap type icon (plastic bottle, metal can, paper stack, cardboard box)
  - Material name (text-xl, bold)
  - Rate displayed prominently: "₹ XX per kg" (text-3xl, green)
  - Hover effect: slight lift and green glow

### Request Pickup Form
- Clean white card with generous padding (p-8 to p-10)
- Form fields with green focus states
- Input styling: rounded-lg border with shadow-sm
- Multi-select for scrap types with checkboxes
- Textarea for additional notes
- Large submit button: "Schedule Pickup" (full-width on mobile)
- Success state: green checkmark with confirmation message

### Testimonials Section
- Masonry or carousel layout
- 3 visible testimonials (desktop), 1 (mobile) with navigation dots
- Each testimonial:
  - 5-star rating (green stars)
  - Quote text (text-lg, italic)
  - Customer photo (rounded-full, 60px)
  - Name and location below

### Contact Form
- Two-column layout: Form (left 60%), Contact info (right 40%)
- Form fields: Name, Email, Phone, Subject, Message (textarea)
- Contact info card: Address, phone, email, business hours with icons
- Map embed option below contact section

### Career Section
- Hero: "Join Our Green Mission"
- Upload CV functionality with drag-and-drop zone
- Form: Position applying for (dropdown), Name, Email, Phone, Cover Letter
- File upload area with green border, cloud upload icon
- Submit button: "Apply Now"

### Footer
- 4-column layout (stacked on mobile)
  - Column 1: Logo, tagline, social media icons (green on hover)
  - Column 2: Quick Links (Services, About, Contact, Careers)
  - Column 3: Services list
  - Column 4: Newsletter signup with email input + green submit button
- Bottom bar: Copyright, Privacy Policy, Terms links
- Background: Light gray (gray-50) with green accent divider at top

## Images

### Hero Image
Large, prominent hero image showing:
- Friendly scrap collection team member in branded uniform
- Clean eco-friendly truck/vehicle in background
- Sorted recyclable materials (organized bins)
- Modern, bright, professional photography
- Position: Right side of hero section (40% width on desktop)
- Treatment: Rounded corners (rounded-3xl), subtle shadow

### Additional Images
- **Services Section**: Icon illustrations for each service (modern, minimalist style with green accents)
- **Company Carousel**: Placeholder company logos (grayscale treatment)
- **Testimonials**: Customer photos (circular avatars, 60-80px)
- **Initiatives**: Full-bleed background images showing environmental impact (green spaces, clean communities, recycling centers)

## Animations
- Smooth scroll behavior throughout
- Hover effects on cards: transform scale(1.02) with shadow enhancement
- Counter animations on trust metrics when scrolled into view
- Carousel auto-scroll with pause on hover
- Form input focus: green border glow transition
- CTA buttons: subtle lift on hover

## Accessibility
- Maintain WCAG AA contrast ratios with vibrant green (#00C853) against white
- All interactive elements keyboard accessible
- Form labels clearly associated with inputs
- Alt text for all images
- Skip navigation link for screen readers

This design creates a trustworthy, modern, eco-friendly brand identity while maintaining usability and visual richness throughout all sections.