export const useConstantStore = defineStore("useConstantStore", () => {
  const mobileSidebarShow = ref(false);

  function toggleMobileSidebar() {
    mobileSidebarShow.value = !mobileSidebarShow.value;
  }

  return {
    mobileSidebarShow,
    toggleMobileSidebar,
  };
});
