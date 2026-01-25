/**
 * JSON-LD Schema markup for SEO
 * Provides structured data for search engines
 */

import Script from 'next/script';

interface JsonLdProps {
  type?: 'website' | 'course' | 'product' | 'article';
  data?: Record<string, any>;
}

export function JsonLd({ type = 'website', data = {} }: JsonLdProps) {
  const getSchemaData = () => {
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "FlutterToNative.pro",
          "alternateName": "Flutter to iOS Playbook",
          "url": "https://www.fluttertonative.pro",
          "description": "Master iOS native development in weeks, not months. Premium guide for senior Flutter engineers transitioning to iOS.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://www.fluttertonative.pro/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://twitter.com/fluttertonative",
            "https://github.com/fluttertonative"
          ]
        };

      case 'course':
        return {
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Flutter to iOS Playbook",
          "description": "Complete migration guide for Senior Flutter Engineers transitioning to iOS native development. Includes architecture patterns, SwiftUI tutorials, and interview preparation.",
          "provider": {
            "@type": "Organization",
            "name": "FlutterToNative.pro",
            "url": "https://www.fluttertonative.pro"
          },
          "hasCourseInstance": {
            "@type": "CourseInstance",
            "courseMode": "online",
            "courseWorkload": "PT20H",
            "instructor": {
              "@type": "Organization",
              "name": "FlutterToNative.pro"
            }
          },
          "audience": {
            "@type": "EducationalAudience",
            "educationalRole": "student",
            "audienceType": "Senior Flutter Engineers"
          },
          "educationalLevel": "Advanced",
          "teaches": [
            "iOS Architecture Patterns",
            "SwiftUI Development",
            "Flutter to Swift Migration",
            "iOS Interview Preparation",
            "Native Mobile Development"
          ],
          "totalTime": "PT20H",
          "coursePrerequisites": "Advanced Flutter development experience",
          "offers": {
            "@type": "Offer",
            "price": "49.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "category": "Educational"
          },
          ...data
        };

      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Flutter to iOS Playbook",
          "applicationCategory": "EducationalApplication",
          "operatingSystem": "Web",
          "description": "Premium migration guide for Senior Flutter Engineers transitioning to iOS native development.",
          "offers": {
            "@type": "Offer",
            "price": "49.00",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "FlutterToNative.pro"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "127",
            "bestRating": "5"
          },
          "author": {
            "@type": "Organization",
            "name": "FlutterToNative.pro",
            "url": "https://www.fluttertonative.pro"
          },
          "datePublished": "2024-01-01",
          "inLanguage": "en-US",
          ...data
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title || "Flutter to iOS Migration Guide",
          "description": data.description || "Learn how to transition from Flutter to iOS native development",
          "author": {
            "@type": "Organization",
            "name": "FlutterToNative.pro"
          },
          "publisher": {
            "@type": "Organization",
            "name": "FlutterToNative.pro",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.fluttertonative.pro/logo.png"
            }
          },
          "datePublished": data.publishedTime || "2024-01-01",
          "dateModified": data.modifiedTime || "2024-01-01",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url || "https://www.fluttertonative.pro"
          },
          "image": {
            "@type": "ImageObject",
            "url": data.image || "https://www.fluttertonative.pro/og-image.png",
            "width": 1200,
            "height": 630
          },
          ...data
        };

      default:
        return {};
    }
  };

  return (
    <Script
      id={`json-ld-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchemaData()),
      }}
    />
  );
}