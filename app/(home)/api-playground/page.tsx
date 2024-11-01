"use client"
import {ApiReferenceReact} from '@scalar/api-reference-react'
import {useTheme} from 'next-themes'

function ApiDocs() {
  const {theme} = useTheme()

  return (
    <ApiReferenceReact
      configuration={{
        searchHotKey: '/',
        metaData: {
          title: 'Gebeta Maps API Playground',
        },
        spec: {
          url: 'https://petstore.swagger.io/v2/swagger.json',
        },
        theme: 'purple',
        darkMode: theme === 'dark' ? true : false,
        hideDarkModeToggle: true
      }}
    />
  );
}

export default ApiDocs;
