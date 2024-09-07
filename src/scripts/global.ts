export function handleSkeletonLoading(containerSelector: string): void {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container: Element) => {
    const img = container.querySelector('img');
    const skeletons = container.querySelectorAll('.skeleton-loader');

    const showContent = (): void => {
      if (img) {
        img.classList.remove('opacity-0');
      }
      skeletons.forEach((skeleton: Element) => skeleton.classList.add('hidden'));
    };

    if (img) {
      if (img.complete) {
        showContent();
      } else {
        img.onload = showContent;
      }
    }
  });
}