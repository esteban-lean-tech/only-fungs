// onlyfunge:

const max_caption_length = 280;

export function handle(state, action) {
  if (action.input.function === "post") {
    if (
      typeof action.input.caption !== "string" ||
      action.input.caption.length > max_caption_length
    ) {
      throw new ContractError(
        `Caption too long...280chars max!: ${action.input.caption}`
      );
    }
    if (typeof action.input.imageurl !== "string") {
      throw new ContractError("Image URL");
    }
    if (typeof action.input.id !== "string" || action.input.id.length === 0) {
      throw new ContractError("Needs id");
    }
    state.feed.push({
      ownedBy: action.caller,
      caption: action.input.caption,
      imageurl: action.input.imageurl,
      id: action.input.id,
    });

    return { state };
  }

  if (action.input.function === "buy") {
    if (typeof action.input.id !== "string") {
      throw new ContractError("Id is missing");
    }

    const posts = state.feed.filter((post) => {
      post.id === action.input.id;
    });

    if (posts.length === 0) {
      throw new ContractError("Post not found");
    }

    const toBuy = posts[0];

    toBuy.ownedBy = action.caller;

    return { state };
  }

  throw new ContractError("Invalid input");
}
