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
import { useTranslations } from "next-intl";

type Props = {
	currentPage: number;
	totalPages: number;
	setCurrentPage: (page: number) => void;
	pageSize: number;
	setPageSize: (size: number) => void;
};

export const ProductsPagination = ({
	currentPage,
	totalPages,
	setCurrentPage,
	pageSize,
	setPageSize,
}: Props) => {

	const t = useTranslations();

	const handlePageSizeChange = (value: string) => {
		setPageSize(Number(value));
	};

	const handlePrevious = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};
	return (
		<section className="w-full pt-5 mt-2 flex flex-col gap-5 lg:flex-row lg:gap-0">
			<div className="w-full gap-2 flex items-center justify-center lg:justify-start lg:w-[50%]">
				<label className="opacity-80" htmlFor="show-results">
					{t("pagination.showResult")}:
				</label>
				<Select onValueChange={handlePageSizeChange} value={pageSize.toString()}>
					<SelectTrigger id="show-results" className="w-[70px]">
						<SelectValue placeholder={pageSize.toString()} />
					</SelectTrigger>
					<SelectContent className="min-w-[70px]">
						<SelectGroup>
							{["10", "20", "30", "40", "50"].map((val) => (
								<SelectItem key={val} value={val}>
									{val}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="w-full lg:w-[50%]">
				<Pagination className="justify-center lg:justify-end">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handlePrevious();
								}}
							/>
						</PaginationItem>

						{Array.from({ length: totalPages }, (_, i) => (
							<PaginationItem key={i}>
								<PaginationLink
									href="#"
									isActive={currentPage === i + 1}
									onClick={(e) => {
										e.preventDefault();
										setCurrentPage(i + 1);
									}}
								>
									{i + 1}
								</PaginationLink>
							</PaginationItem>
						))}

						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handleNext();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</section>
	);
};
