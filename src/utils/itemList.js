// Date functionalities import
const moment = require('moment');

// Sort function
export const sorter = (data, content, tracker, filter=null) => {
  // Filter out usafa, jnac, and completed tabs
  if (filter != null) {
    content = content.filter(key =>
      Object.keys(filter).some(
        option => data[tracker.toLowerCase()][key]["tags"][option] &&
        filter[option]
      ) ||
      Object.values(
        data[tracker.toLowerCase()][key]["tags"]).every(val => val === false
      )
    );
  }

  // Sort list
  content.sort((a, b) => {
    // Get the root data
    const root = data[tracker.toLowerCase()];

    // Sort by completed tag, pushing completed items to end
    if (root[a].tags.completed && !root[b].tags.completed) return 1;
    if (!root[a].tags.completed && root[b].tags.completed) return -1;

    // Then sort by initialization date
    let dateA = moment(`${root[a].initARMS.month}-${root[a].initARMS.year}`, 'MM-YYYY').toDate()
    let dateB = moment(`${root[b].initARMS.month}-${root[b].initARMS.year}`, 'MM-YYYY').toDate();
    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    // Sort by presence of USAFA tag first
    if (root[a].tags.usafa && !root[b].tags.usafa) return 1;
    if (!root[a].tags.usafa && root[b].tags.usafa) return -1;

    // Sort by presence of JNAC tag first
    if (root[a].tags.jnac && !root[b].tags.jnac) return 1;
    if (!root[a].tags.jnac && root[b].tags.jnac) return -1;

    // Finally sort by name
    if (a < b) return -1;
    if (a > b) return 1;
  })

  // Return the sorted information
  return content;
}