import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const ProductsPagination = () => {
	return (
		<section className="w-full pt-5 mt-2 flex flex-col gap-5 md:flex-row md:gap-0">
			<div className="w-full gap-2 flex items-center justify-center md:justify-start md:w-[50%]">
				<label className="opacity-80">Show result:</label>
				<Select>
					<SelectTrigger className="w-[70px]">
						<SelectValue placeholder="10" />
					</SelectTrigger>
					<SelectContent className="min-w-[70px]">
						<SelectGroup>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="20">20</SelectItem>
							<SelectItem value="30">30</SelectItem>
							<SelectItem value="40">40</SelectItem>
							<SelectItem value="50">50</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full md:w-[50%]">
				<Pagination className="justify-center md:justify-end">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious href="#" />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">1</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">2</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">3</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationLink href="#">4</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationNext href="#" />
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</section>
	);
};
