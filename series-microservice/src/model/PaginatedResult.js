"use strict"

/*
	Class that organizes a paginated search/query result.
*/

class PaginatedResult {

    /**
		 * Builds the paginated result.
		 * @param 	{Array} pageResults 					Results tobe paginated.
		 * @param  	{Number} currentPage					The current page.
		 * @param 	{Number} totalResultCount			Total of results considering all pages.
		 * @param		{Number} pageSize							Size of the page.
		 */
    constructor(pageResults, currentPage, totalResultCount, pageSize) {
        //checks the pageResults param
        if (!Array.isArray(pageResults)) {
            throw new Error("Invalid 'pageResults' parameter");
        }

        //checks the currentPage param
        let numericCurrentPage = Number(currentPage);
        if (!isPositiveIntegerParam(numericCurrentPage)) {
            throw new Error("Invalid 'currentPage' parameter");
        }

        //checks the totalResultCount param
        let numericTotalResultCount = Number(totalResultCount);
        if (totalResultCount == null || !isPositiveIntegerParam(numericTotalResultCount, true)) {
            throw new Error("Invalid 'totalResultCount' parameter");
        } else if (numericTotalResultCount < pageResults.length) {
            throw new Error("Inconsistent state. 'totalResultCount' is less than 'pageResults' count (" + numericTotalResultCount + "/" + pageResults.length + ")");
        }

        //checks the pageSize param
        pageSize = (pageSize != null)
            ? Number(pageSize)
            : 10;
        if (!isPositiveIntegerParam(pageSize)) {
            throw new Error("Invalid 'pageSize' parameter");
        }

        //calculates the totalPageCount param
        let totalPageCount = 1;
        if (numericTotalResultCount > 0) {
            totalPageCount = Math.ceil(numericTotalResultCount / pageSize);
        }

        this.pageResults = pageResults;
        this.currentPage = numericCurrentPage;
        this.totalResultCount = numericTotalResultCount;
        this.pageSize = pageSize;
        this.totalPageCount = totalPageCount;
    }
}

//checks for NaN, positive/zero and integer
function isPositiveIntegerParam(param, allowsZero) {
    return !isNaN(param) && Number(param) % 1 === 0 && ((!allowsZero && param > 0) || (allowsZero && param >= 0));
}

module.exports = PaginatedResult;
