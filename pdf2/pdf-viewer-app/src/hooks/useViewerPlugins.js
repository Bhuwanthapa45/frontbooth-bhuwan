import { createPluginRegistration } from '@embedpdf/core';
import { LoaderPluginPackage } from '@embedpdf/plugin-loader/react';
import { ViewportPluginPackage } from '@embedpdf/plugin-viewport/react';
import { ScrollPluginPackage } from '@embedpdf/plugin-scroll/react';
import { RenderPluginPackage } from '@embedpdf/plugin-render/react';
import { ZoomPluginPackage } from '@embedpdf/plugin-zoom/react';
import { RotatePluginPackage } from '@embedpdf/plugin-rotate/react';
import { TilingPluginPackage } from '@embedpdf/plugin-tiling/react';
import { ThumbnailPluginPackage } from '@embedpdf/plugin-thumbnail/react';
import { SelectionPluginPackage } from '@embedpdf/plugin-selection/react';
import { SearchPluginPackage } from '@embedpdf/plugin-search/react';
import { PrintPluginPackage } from '@embedpdf/plugin-print/react';
import { ExportPluginPackage } from '@embedpdf/plugin-export/react';
import { InteractionManagerPluginPackage } from '@embedpdf/plugin-interaction-manager/react'; // NEW
import { AnnotationPluginPackage } from '@embedpdf/plugin-annotation/react'; // NEW

export const useViewerPlugins = (fileUrl) => {
  return [
    //  Core Logic & Interaction (Must be registered early)
    createPluginRegistration(InteractionManagerPluginPackage),
    
    // Data Loading
    createPluginRegistration(LoaderPluginPackage, {
      loadingOptions: {
        type: 'url',
        pdfFile: {
          id: 'user-uploaded-doc',
          url: fileUrl, 
        },
      },
    }),

    //  Viewport & Rendering
    createPluginRegistration(ViewportPluginPackage),
    createPluginRegistration(ScrollPluginPackage),
    createPluginRegistration(RenderPluginPackage),
    createPluginRegistration(TilingPluginPackage),
    
    //  Feature Capabilities
    createPluginRegistration(ZoomPluginPackage, { defaultZoomLevel: 1.0 }),
    createPluginRegistration(RotatePluginPackage),
    createPluginRegistration(ThumbnailPluginPackage),
    createPluginRegistration(SelectionPluginPackage), 
    createPluginRegistration(SearchPluginPackage),
    createPluginRegistration(PrintPluginPackage),
    createPluginRegistration(ExportPluginPackage),
    createPluginRegistration(AnnotationPluginPackage),
  ];
};
