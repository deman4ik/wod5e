/* global game, Dialog, WOD5E */

/** Handle adding a new edge to the sheet */
export const _onAddEdge = async function (event) {
  event.preventDefault()

  // Top-level variables
  const actor = this.actor

  // Secondary variables
  const selectLabel = game.i18n.localize('WOD5E.HTR.SelectEdge')
  const itemOptions = WOD5E.Edges.getList()

  // Variables yet to be defined
  let options = []
  let edgeSelected

  // Prompt a dialog to determine which edge we're adding
  // Build the options for the select dropdown
  for (const [key, value] of Object.entries(itemOptions)) {
    options += `<option value="${key}">${value.displayName}</option>`
  }

  // Template for the dialog form
  const template = `
    <form>
      <div class="form-group">
        <label>${selectLabel}</label>
        <select id="edgeSelect">${options}</select>
      </div>
    </form>`

  // Define dialog buttons
  const buttons = {
    submit: {
      icon: '<i class="fas fa-check"></i>',
      label: game.i18n.localize('WOD5E.Add'),
      callback: async (html) => {
        edgeSelected = html.find('#edgeSelect')[0].value

        // Make the edge visible
        actor.update({ [`system.edges.${edgeSelected}.visible`]: true })
      }
    },
    cancel: {
      icon: '<i class="fas fa-times"></i>',
      label: game.i18n.localize('WOD5E.Cancel')
    }
  }

  // Display the dialog
  new Dialog({
    title: game.i18n.localize('WOD5E.Add'),
    content: template,
    buttons,
    default: 'submit'
  }, {
    classes: ['wod5e', 'dialog', 'hunter', 'dialog']
  }).render(true)
}
