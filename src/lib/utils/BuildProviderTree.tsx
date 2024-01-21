export const BuildProviderTree: any = (providers: any) => {
  if (providers.length === 1) {
    return providers[0];
  }
  const A = providers.shift();
  const B = providers.shift();
  return BuildProviderTree([
    ({ children }: any) => (
      <A>
        <B>{children}</B>
      </A>
    ),
    ...providers,
  ]);
};
