// test/__mocks__/assistantDataMock.js
export const useSystemState = () => ({
    cloudUser: { name: 'Test', avatar: null, gravatar: { md: 'x' } },
  });
  
  export const useAppState = () => ({
    filter: { owner: 'all', search: '' },
    libraries: [],
    isLoadingLibraries: false,
    isLoadingTeams: false,
  });
  