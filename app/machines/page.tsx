import CreateMachineDialog from "@/components/dialogs/CreateMachineDialog";
import MachinesGallery from "@/components/galleries/MachinesGallery";

export default function MachinesPage() {
  return (
    <main>
      <MachinesGallery />
      <CreateMachineDialog />
    </main>
  );
}
