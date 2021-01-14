import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component test", () => {
    test("pages count is 11 but should be showed only 10", () => {
        const component = create(
            <Paginator
                onPageChange={() => {}}
                currentPage={1}
                totalItemsCount={11}
                pageSize={1}
                portionSize={5}
            />
        );
        const root = component.root;
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(5);
    });

    test("if pages count is more then 10 button NEXT should be showed", () => {
        const component = create(
            <Paginator
                onPageChange={() => {}}
                currentPage={1}
                totalItemsCount={11}
                pageSize={1}
                portionSize={5}
            />
        );
        const root = component.root;
        let button = root.findAllByType("button");
        expect(button.length).toBe(1);
    });
});
