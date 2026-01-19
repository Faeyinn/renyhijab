# Frontend Project Structure

This project follows React best practices for folder structure and TypeScript usage.

## 📁 Folder Structure

```
resources/js/
├── components/           # Reusable UI components
│   ├── common/          # Shared components used across multiple pages
│   │   ├── action-buttons.tsx
│   │   ├── data-table.tsx
│   │   ├── page-header.tsx
│   │   └── simple-form-dialog.tsx
│   ├── ui/              # UI library components (shadcn/ui)
│   ├── dashboard/       # Dashboard-specific components
│   ├── transactions/    # Transaction-specific components
│   ├── products/        # Product-specific components
│   ├── categories/      # Category-specific components
│   ├── customers/       # Customer-specific components
│   ├── auth/            # Authentication components (ready for expansion)
│   ├── settings/        # Settings components (ready for expansion)
│   └── shared/          # Components shared across features (ready for expansion)
├── pages/               # Page components (routes)
│   ├── auth/            # Authentication pages
│   ├── dashboard.tsx    # Dashboard page
│   ├── transactions/    # Transaction pages
│   ├── products/        # Product pages
│   ├── categories/      # Category pages
│   ├── customers/       # Customer pages
│   └── settings/        # Settings pages
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
│   ├── index.ts         # Main exports
│   ├── common.ts        # Shared types
│   ├── dashboard.ts     # Dashboard types
│   ├── transaction.ts   # Transaction types
│   ├── product.ts       # Product types
│   ├── category.ts      # Category types
│   └── customer.ts      # Customer types
├── utils/               # Utility functions
│   └── currency.ts      # Currency formatting utilities
├── constants/           # Application constants (ready for expansion)
├── services/            # API services and business logic (ready for expansion)
├── lib/                 # Library configurations
├── actions/             # Laravel-specific actions
├── routes/              # Route definitions
├── layouts/             # Layout components
└── wayfinder/           # Route helpers
```

## 🎯 Architecture Principles

### Component Organization
- **Common Components**: Reusable across the entire application
- **Feature Components**: Specific to a particular domain/feature
- **UI Components**: Low-level design system components

### Type Organization
- **Domain Types**: Types specific to each business domain
- **Common Types**: Shared types used across domains
- **Page Props**: Types for page component props

### Separation of Concerns
- **UI Logic**: Components handle presentation
- **Business Logic**: Services and hooks handle data operations
- **Type Safety**: All interfaces properly typed

## 🚀 Benefits

- **Maintainability**: Easy to find and modify code
- **Scalability**: Clear structure for adding new features
- **Type Safety**: Comprehensive TypeScript coverage
- **Reusability**: Components and utilities can be reused
- **Developer Experience**: Intuitive folder structure

## 📝 Usage Guidelines

### Adding New Features
1. Create feature folder in `components/`
2. Add types in `types/` with appropriate domain file
3. Create page component in `pages/`
4. Add any custom hooks in `hooks/`
5. Add business logic in `services/` if needed

### Component Naming
- Use PascalCase for component names
- Use kebab-case for file names
- Export default components as named exports when possible

### Type Definitions
- Define interfaces in appropriate domain files
- Use descriptive names
- Export from `types/index.ts` for easy importing