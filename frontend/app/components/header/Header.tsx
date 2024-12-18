import * as React from "react"
import {
 Select,
 SelectContent,
 SelectGroup,
 SelectItem,
 SelectLabel,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
 return (
   <Select>
     <SelectTrigger className="w-[180px]">
       <SelectValue placeholder="Select a country" />
     </SelectTrigger>
     <SelectContent>
       <SelectGroup>
         <SelectLabel>Country</SelectLabel>
         <SelectItem value="costa-rica">Costa Rica 🇨🇷</SelectItem>
       </SelectGroup>
     </SelectContent>
   </Select>
 )
}