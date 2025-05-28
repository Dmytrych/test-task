import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {ReactNode} from "react";

type ProjectListItemProps = {
  title: string
  url: string
  stars: number
  forks: number
  issues: number
  repositoryCreatedAt: Date
  ownerLogin: string
  actions: ReactNode
}

const ProjectListItem = (props: ProjectListItemProps) => {
  return (
    <Card title={props.title}>
      <CardHeader>
        <CardTitle>
          <Link href={props.url}>{props.title}</Link>
        </CardTitle>
        <CardDescription>{props.ownerLogin}</CardDescription>
        <CardDescription>Created at: {props.repositoryCreatedAt.toString()}</CardDescription>
      </CardHeader>
      <CardContent>
        forks: {props.forks}<br/>
        issues: {props.issues}<br/>
        stars: {props.stars}
      </CardContent>
      <CardFooter className="flex justify-between">
        {props.actions}
      </CardFooter>
    </Card>
  )
}

export default ProjectListItem
