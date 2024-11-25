"use client"

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { value: [number, number]; onValueChange: (value: [number, number]) => void; }
>(({ className, value, onValueChange, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn("relative flex w-full touch-none select-none items-center", className)}
		value={value}
		onValueChange={onValueChange}
		max={1500}
		min={0}
		step={10}
		{...props}
	>
		{/* Range */}
		<SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
			<SliderPrimitive.Range className="absolute h-full bg-primary" />
		</SliderPrimitive.Track>

		{/* Min Value */}
		<SliderPrimitive.Thumb 
			className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" 
			style={{ left: `${(value[0] / 1500) * 100}%` }} 
		/>

		{/* Max Value */}
		<SliderPrimitive.Thumb 
			className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" 
			style={{ left: `${(value[1] / 1500) * 100}%` }} 
		/>
	</SliderPrimitive.Root>
));

Slider.displayName = "Slider";

export { Slider }
