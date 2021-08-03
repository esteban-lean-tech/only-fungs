// onlyfunge:

const max_caption_length = 280;

export function handle (state, action) {
  if (action.input.function === 'post') {
    if (typeof action.input.caption !== 'string' || action.input.caption.length > max_caption_length) {
      throw new ContractError(`Caption too long...280chars max!: ${action.input.caption}`)
    }
    if (typeof action.input.imageurl !== 'string') {
      throw new ContractError('Image URL')
    }
    state.feed.push({
      ownedBy: action.caller,
      caption: action.input.caption,
      imageurl: action.input.imageurl
    })

    return { state }
  }

  // if (action.input.function === 'transfer') {
  //   if (typeof action.input.name !== 'string' || action.input.name.length < 3) {
  //     throw new ContractError(`Invalid name provided: ${action.input.name}`)
  //   }
  //   if (typeof action.input.target !== 'string') {
  //     throw new ContractError('Must provide a target to transfer the name to')
  //   }
  //   if (!state.names[action.input.name]) {
  //     throw new ContractError('Name not registered')
  //   }
  //   if (state.names[action.input.name].ownedBy !== action.caller) {
  //     throw new ContractError('Name not owned by caller')
  //   }

  //   state.names[action.input.name].ownedBy = action.input.target

  //   return { state }
  // }

  throw new ContractError('Invalid input')
}
