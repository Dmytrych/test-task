import {Button} from "@/components/ui/button";

type ProjectListItemActionsProps = {
  onDelete: () => Promise<void> | void;
  onRefresh: () => Promise<void> | void;
}

const ProjectListItemActions = ({ onDelete, onRefresh }: ProjectListItemActionsProps) => {
  return (
    <>
      <Button onClick={onDelete} variant="outline" className='cursor-pointer'>Delete</Button>
      <Button onClick={onRefresh} className='cursor-pointer'>Refresh</Button>
    </>
  )
}

export default ProjectListItemActions;
