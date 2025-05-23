import WorkoutTemplateGallery from "@/components/galleries/WorkoutTemplateGallery";
import CreateTemplateDialog from "@/components/dialogs/CreateTemplateDialog";

export default function TemplatesPage() {
  return (
    <main>
      <WorkoutTemplateGallery />
      <CreateTemplateDialog />
    </main>
  );
}
