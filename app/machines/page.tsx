import CreateMachineDialog from "@/components/forms/CreateMachineDialog";
import MachinesGallery from "@/components/galleries/MachinesGallery";

export default function MachinesPage() {
  return (
    <main className="h-screen">
      <MachinesGallery />
      <CreateMachineDialog />
    </main>
  );
}
