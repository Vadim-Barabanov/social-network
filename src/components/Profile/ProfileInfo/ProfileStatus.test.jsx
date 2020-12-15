import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status={"New samurai"} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("New samurai");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status={"New samurai"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status={"New samurai"} />);
        const root = component.root;
        let span = root.findByType("span");
        expect(...span.children).toBe("New samurai");
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status={"New samurai"} />);
        const root = component.root;
        expect(() => {
            root.findByType("input");
        }).toThrow();
    });

    test("input should be displayed in editMode", () => {
        const component = create(<ProfileStatus status={"New samurai"} />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("New samurai");
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(
            <ProfileStatus status={"New samurai"} updateStatus={mockCallback} />
        );
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
